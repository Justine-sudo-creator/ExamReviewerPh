'use client'

import { useState, useEffect } from 'react'
import { getReviewers, addReviewer, updateReviewer, deleteReviewer, adminLogin, adminLogout, isAdminLoggedIn, Reviewer } from '@/lib/database'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Loader2, Plus, Edit, Trash2, LogOut, Upload, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Header from '@/components/Header'
import Image from 'next/image'

interface ReviewerFormData {
  title: string
  description: string
  subject: string
  difficulty: string
  price: string
  payment_url: string
  image_url: string
}

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(true)
  const [loginError, setLoginError] = useState('')
  const [reviewers, setReviewers] = useState<Reviewer[]>([])
  const [isEditing, setIsEditing] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<ReviewerFormData>({
    title: '',
    description: '',
    subject: '',
    difficulty: '',
    price: '',
    payment_url: '',
    image_url: ''
  })

  const router = useRouter()

  useEffect(() => {
    checkAuthStatus()
  }, [])

  useEffect(() => {
    if (isLoggedIn) {
      fetchReviewers()
    }
  }, [isLoggedIn])

  const checkAuthStatus = () => {
    setIsLoggedIn(isAdminLoggedIn())
    setLoading(false)
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoginError('')
    
    try {
      const success = await adminLogin(email, password)
      if (success) {
        setIsLoggedIn(true)
      } else {
        setLoginError('Invalid credentials')
      }
    } catch (error) {
      console.error('Login error:', error)
      setLoginError('Login failed. Please try again.')
    }
  }

  const handleLogout = async () => {
    try {
      await adminLogout()
      setIsLoggedIn(false)
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  const fetchReviewers = async () => {
    try {
      const data = await getReviewers()
      setReviewers(data || [])
    } catch (error) {
      console.error('Error fetching reviewers:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const reviewerData = {
  title: formData.title,
  description: formData.description,
  subject: formData.subject,
  difficulty: formData.difficulty as 'easy' | 'Medium' | 'Hard',
  price: parseInt(formData.price),
  payment_url: formData.payment_url,
  image_url: formData.image_url
}

      if (isEditing && editingId) {
        await updateReviewer(editingId, reviewerData)
      } else {
        await addReviewer(reviewerData)
      }

      // Reset form
      setFormData({
        title: '',
        description: '',
        subject: '',
        difficulty: '',
        price: '',
        payment_url: '',
        image_url: ''
      })
      setIsEditing(false)
      setEditingId(null)
      fetchReviewers()
    } catch (error) {
      console.error('Error saving reviewer:', error)
      alert('Failed to save reviewer. Please try again.')
    }
  }

  const handleEdit = (reviewer: Reviewer) => {
    setFormData({
      title: reviewer.title,
      description: reviewer.description,
      subject: reviewer.subject,
      difficulty: reviewer.difficulty,
      price: reviewer.price.toString(),
      payment_url: reviewer.payment_url,
      image_url: reviewer.image_url || ''
    })
    setIsEditing(true)
    setEditingId(reviewer.id)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this reviewer?')) return

    try {
      await deleteReviewer(id)
      fetchReviewers()
    } catch (error) {
      console.error('Error deleting reviewer:', error)
      alert('Failed to delete reviewer. Please try again.')
    }
  }

  const cancelEdit = () => {
    setFormData({
      title: '',
      description: '',
      subject: '',
      difficulty: '',
      price: '',
      payment_url: '',
      image_url: ''
    })
    setIsEditing(false)
    setEditingId(null)
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // In a real app, you'd upload to a service like Cloudinary or AWS S3
      // For demo purposes, we'll use a placeholder URL
      const imageUrl = `/uploads/${file.name}`
      setFormData({ ...formData, image_url: imageUrl })
    }
  }

  const removeImage = () => {
    setFormData({ ...formData, image_url: '' })
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    )
  }

  if (!isLoggedIn) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-center">Admin Login</CardTitle>
                <p className="text-sm text-gray-600 text-center">
                  Needs admin credentials!
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  {loginError && (
                    <p className="text-red-600 text-sm">{loginError}</p>
                  )}
                  <Button type="submit" className="w-full">
                    Sign In
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <Button onClick={handleLogout} variant="outline">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Add/Edit Form */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plus className="h-5 w-5" />
                    {isEditing ? 'Edit Reviewer' : 'Add New Reviewer'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="title">Title</Label>
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        rows={3}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="subject">Subject</Label>
                      <Select
                        value={formData.subject}
                        onValueChange={(value) => setFormData({ ...formData, subject: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select subject" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Practice Sets">Practice Sets</SelectItem>
                          <SelectItem value="Mock Exams">Mock Exams</SelectItem>
                          <SelectItem value="Tips & Cheatsheets">Tips & Cheatsheets</SelectItem>
                          <SelectItem value="Bundles">Bundles</SelectItem>
                          <SelectItem value="Others">Others</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="difficulty">Difficulty</Label>
                      <Select
                        value={formData.difficulty}
                        onValueChange={(value) => setFormData({ ...formData, difficulty: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select difficulty" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="easy">Easy</SelectItem>
                          <SelectItem value="Medium">Medium</SelectItem>
                          <SelectItem value="Hard">Hard</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="price">Price (₱)</Label>
                      <Input
                        id="price"
                        type="number"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="payment_url">Payment URL</Label>
                      <Input
                        id="payment_url"
                        type="url"
                        value={formData.payment_url}
                        onChange={(e) => setFormData({ ...formData, payment_url: e.target.value })}
                        placeholder="https://ko-fi.com/..."
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="image">Product Image</Label>
                      <div className="space-y-4">
                        {formData.image_url ? (
                          <div className="relative">
                            <div className="w-full h-48 relative overflow-hidden rounded-lg bg-gray-100">
                              <Image
                                src={formData.image_url}
                                alt="Product preview"
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 400px"
                              />
                            </div>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={removeImage}
                              className="mt-2 w-full"
                            >
                              <X className="h-4 w-4 mr-2" />
                              Remove Image
                            </Button>
                          </div>
                        ) : (
                          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                            <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                            <p className="text-sm text-gray-600 mb-2">Upload product image</p>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleImageUpload}
                              className="hidden"
                              id="image-upload"
                            />
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => document.getElementById('image-upload')?.click()}
                            >
                              Choose File
                            </Button>
                          </div>
                        )}
                        <div className="text-xs text-gray-500">
                          <p>Or enter image URL directly:</p>
                          <Input
                            type="url"
                            value={formData.image_url}
                            onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                            placeholder="https://example.com/image.jpg"
                            className="mt-1"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button type="submit" className="flex-1">
                        {isEditing ? 'Update' : 'Add'} Reviewer
                      </Button>
                      {isEditing && (
                        <Button type="button" variant="outline" onClick={cancelEdit}>
                          Cancel
                        </Button>
                      )}
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Reviewers List */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Manage Reviewers ({reviewers.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {reviewers.map((reviewer) => (
                      <div key={reviewer.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4 flex-1">
                          {reviewer.image_url && (
                            <div className="w-16 h-16 relative overflow-hidden rounded-lg bg-gray-100 flex-shrink-0">
                              <Image
                                src={reviewer.image_url}
                                alt={reviewer.title}
                                fill
                                className="object-cover"
                                sizes="64px"
                              />
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold truncate">{reviewer.title}</h3>
                            <p className="text-sm text-gray-600">{reviewer.subject} • {reviewer.difficulty} • ₱{reviewer.price}</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEdit(reviewer)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDelete(reviewer.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}