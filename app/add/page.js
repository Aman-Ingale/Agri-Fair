"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Loader2, Plus } from "lucide-react";

const url = process.env.NEXT_PUBLIC_BASE_URL;

export default function AddListingPage() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    crop: "",
    variety: "",
    grade: "",
    total_quantity: "",
    available_quantity: "",
    price: "",
    location: "",
    harvest_date: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {

      const response = await fetch(`${url}/api/listings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: formData.title,
          crop: formData.crop,
          variety: formData.variety,
          grade: Number(formData.grade),
          total_quantity: Number(formData.total_quantity),
          available_quantity: Number(formData.available_quantity),
          price: Number(formData.price),
          location: formData.location,
          harvest_date: formData.harvest_date || new Date().toISOString(),
        }),
      });

      const result = await response.json();

      if (result.success) {
        toast.success("Success", {
          description: "Listing added successfully",
        });
        // Reset form
        setFormData({
          title: "",
          crop: "",
          variety: "",
          grade: "",
          total_quantity: "",
          available_quantity: "",
          price: "",
          location: "",
          harvest_date: "",
        });
      } else {
        toast.error("Error", {
          description: result.message || "Failed to add listing",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error", {
        description: "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50/50 dark:from-green-950/20 dark:via-black dark:to-green-950/10">
      <div className="container mx-auto px-4 py-8">
        <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-green-200 dark:border-green-800/30 max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-green-800 dark:text-green-400 flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Add New Listing
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-gray-700 dark:text-gray-300">
                  Title
                </Label>
                <Input
                  id="title"
                  name="title"
                  type="text"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter listing title"
                  required
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="crop" className="text-gray-700 dark:text-gray-300">
                  Crop
                </Label>
                <Select
                  value={formData.crop}
                  onValueChange={(value) => handleSelectChange("crop", value)}
                  required
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select crop type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="wheat">Wheat</SelectItem>
                    <SelectItem value="rice">Rice</SelectItem>
                    <SelectItem value="cotton">Cotton</SelectItem>
                    <SelectItem value="jute">Jute</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="variety" className="text-gray-700 dark:text-gray-300">
                  Variety
                </Label>
                <Input
                  id="variety"
                  name="variety"
                  type="text"
                  value={formData.variety}
                  onChange={handleChange}
                  placeholder="Enter crop variety"
                  required
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="grade" className="text-gray-700 dark:text-gray-300">
                  Grade
                </Label>
                <Select
                  value={formData.grade}
                  onValueChange={(value) => handleSelectChange("grade", value)}
                  required
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select grade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1</SelectItem>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="3">3</SelectItem>
                    <SelectItem value="4">4</SelectItem>
                    <SelectItem value="5">5</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="total_quantity" className="text-gray-700 dark:text-gray-300">
                    Total Quantity
                  </Label>
                  <Input
                    id="total_quantity"
                    name="total_quantity"
                    type="number"
                    value={formData.total_quantity}
                    onChange={handleChange}
                    placeholder="Enter total quantity"
                    required
                    min="0"
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="available_quantity" className="text-gray-700 dark:text-gray-300">
                    Available Quantity
                  </Label>
                  <Input
                    id="available_quantity"
                    name="available_quantity"
                    type="number"
                    value={formData.available_quantity}
                    onChange={handleChange}
                    placeholder="Enter available quantity"
                    required
                    min="0"
                    className="w-full"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="price" className="text-gray-700 dark:text-gray-300">
                  Price (per unit)
                </Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="Enter price per unit"
                  required
                  min="0"
                  step="0.01"
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location" className="text-gray-700 dark:text-gray-300">
                  Location
                </Label>
                <Input
                  id="location"
                  name="location"
                  type="text"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Enter location"
                  required
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="harvest_date" className="text-gray-700 dark:text-gray-300">
                  Harvest Date
                </Label>
                <Input
                  id="harvest_date"
                  name="harvest_date"
                  type="date"
                  value={formData.harvest_date}
                  onChange={handleChange}
                  className="w-full"
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-green-600 hover:bg-green-700 text-white dark:bg-green-700 dark:hover:bg-green-600"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Adding...
                  </>
                ) : (
                  <>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Listing
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
