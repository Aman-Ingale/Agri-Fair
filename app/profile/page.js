"use client"
import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, User, Edit2, Save } from "lucide-react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
  const url = process.env.NEXT_PUBLIC_BASE_URL;

export default function ClientProfile() {
    const [isEditing, setIsEditing] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isPageLoading, setIsPageLoading] = useState(false)

    const id = "";
    const router = useRouter()
    const [profile, setProfile] = useState({})
    //GET request for logging out the provider
    const handleLogout = async () => {
    }
    //PUT request to update client details
    const handleSave = async () => {

    }
      async function getData() {
    
        fetch(`${url}/api/profile`, {
          // cache: "force-cache"
        })
          .then(response => {
            if (!response.ok) {
              console.log("Network response was not ok " + response.status);
            }
            return response.json(); // or response.text()
          })
          .then(data => {
            console.log("Data:", data.data);
            setProfile(data.data)
          })
          .catch(error => {
            console.error("Fetch error:", error);
    
          });
      }
        useEffect(() => {
          getData()
        }, [])
    //GET request for getting details of Client passing id as params
    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50/50 dark:from-green-950/20 dark:via-black dark:to-green-950/10 py-8">
        <div className="container mx-auto p-4 space-y-6">
            <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-green-200 dark:border-green-800/30">
                <CardHeader className="flex flex-row items-center justify-between bg-gradient-to-r from-green-100 to-green-50 dark:from-green-900/30 dark:to-green-800/20 border-b border-green-200 dark:border-green-800/30">
                    <CardTitle className="text-2xl text-green-800 dark:text-green-400">Profile</CardTitle>
                    <Button
                        variant="outline"
                        onClick={() => setIsEditing(!isEditing)}
                        disabled={isLoading}
                        className="border-green-600 text-green-700 hover:bg-green-50 dark:border-green-400 dark:text-green-400 dark:hover:bg-green-900/20"
                    >
                        {isEditing ? (
                            <>
                                <Save className="mr-2 h-4 w-4" />
                                Save Changes
                            </>
                        ) : (
                            <>
                                <Edit2 className="mr-2 h-4 w-4" />
                                Edit Profile
                            </>
                        )}
                    </Button>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-6">
                        <div className="flex items-center space-x-4">
                            <div className="h-20 w-20 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center border border-green-200 dark:border-green-800/30">
                                <User className="h-10 w-10 text-green-600 dark:text-green-400" />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold">{profile?.firstname || ""}</h3>
                                <p className="text-sm text-muted-foreground">
                                    {profile?.description}
                                </p>
                            </div>
                        </div>

                        <div className="grid gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="name">First Name</Label>
                                <Input
                                    id="name"
                                    value={profile?.firstname || ""}
                                    onChange={(e) =>
                                        setProfile((prev) => ({ ...(prev || {}), firstname: e.target.value }))
                                    }
                                    disabled={!isEditing}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="lastname">Last Name</Label>
                                <Input
                                    id="lastname"
                                    value={profile?.lastname || ""}
                                    onChange={(e) =>
                                        setProfile((prev) => ({ ...(prev || {}), lastname: e.target.value }))
                                    }
                                    disabled={!isEditing}
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={profile?.email || ""}
                                    onChange={(e) =>
                                        setProfile((prev) => ({ ...(prev || {}), email: e.target.value }))
                                    }
                                    disabled={!isEditing}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="phone">Phone</Label>
                                <Input
                                    id="phone"
                                    type="tel"
                                    value={profile?.phone_number || ""}
                                    onChange={(e) =>
                                        setProfile((prev) => ({ ...(prev || {}), phone_number: e.target.value }))
                                    }
                                    disabled={!isEditing}
                                />
                            </div>
                            {/* <div className="grid gap-2 w-20">
                                <Label htmlFor="gender">Gender</Label>
                                <select
                                    id="gender"
                                    value={profile?.gender || ""}
                                    onChange={(e) =>
                                        setProfile((prev) => ({ ...(prev || {}), gender: e.target.value }))
                                    }
                                    disabled={!isEditing}
                                >
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                            </div> */}

                            {/* <div className="grid gap-2">
                                <Label htmlFor="address">Address</Label>
                                <Input
                                    id="address"
                                    value={profile?.address || ""}
                                    onChange={(e) =>
                                        setProfile((prev) => ({ ...(prev || {}), address: e.target.value }))
                                    }
                                    disabled={!isEditing}
                                />
                                <div className="w-20 mt-10">
                                    <Button
                                        onClick={handleLogout}
                                        disabled={isEditing}
                                        className="bg-red-600 hover:bg-red-700 text-white dark:bg-red-700 dark:hover:bg-red-600"
                                    >
                                        Log Out
                                    </Button>
                                </div>
                            </div> */}



                        </div>

                        {isEditing && (
                            <div className="flex justify-end space-x-2">
                                <Button
                                    variant="outline"
                                    onClick={() => setIsEditing(false)}
                                    disabled={isLoading}
                                    className="border-green-600 text-green-700 hover:bg-green-50 dark:border-green-400 dark:text-green-400 dark:hover:bg-green-900/20"
                                >
                                    Cancel
                                </Button>
                                <Button onClick={handleSave} disabled={isLoading} className="bg-green-600 hover:bg-green-700 text-white dark:bg-green-700 dark:hover:bg-green-600">
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Saving...
                                        </>
                                    ) : (
                                        "Save Changes"
                                    )}
                                </Button>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
        </div>
    )
} 