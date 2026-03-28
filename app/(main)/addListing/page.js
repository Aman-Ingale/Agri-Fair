"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import crops from "@/public/crops.json";

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

    setFormData((prev) => {
      const updated = { ...prev, [name]: value };

      if (
        name === "total_quantity" ||
        name === "available_quantity"
      ) {
        if (
          Number(updated.available_quantity) >
          Number(updated.total_quantity)
        ) {
          toast.warning("Available quantity cannot exceed total quantity");
        }
      }

      return updated;
    });
  };

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const totalQty = Number(formData.total_quantity);
    const availableQty = Number(formData.available_quantity);

    if (availableQty > totalQty) {
      toast.error("Validation Error", {
        description:
          "Available quantity cannot be greater than total quantity",
      });
      return;
    }

    if (formData.harvest_date) {
      const selectedDate = new Date(formData.harvest_date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (selectedDate > today) {
        toast.error("Validation Error", {
          description: "Harvest date cannot be in the future",
        });
        return;
      }
    }

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
          total_quantity: totalQty,
          available_quantity: availableQty,
          price: Number(formData.price),
          location: formData.location,
          harvest_date:
            formData.harvest_date || new Date().toISOString(),
        }),
      });

      const result = await response.json();

      if (result.success) {
        toast.success("Success", {
          description: "Listing added successfully",
        });

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
      console.error(error);
      toast.error("Error", {
        description: "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50/50 dark:from-green-950/20 dark:via-black dark:to-green-950/10 flex items-center justify-center px-4 py-10">
      <Card className="w-full max-w-3xl shadow-xl border border-green-200 dark:border-green-800/30 bg-white/80 dark:bg-gray-900/80 backdrop-blur">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl font-semibold text-green-700 dark:text-green-400">
            <Plus className="h-5 w-5" />
            Add New Listing
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Title */}
            <div className="space-y-2">
              <Label>Title</Label>
              <Input
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Premium Wheat for Sale"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <div className="space-y-2">
                <Label>Crop</Label>
                <Select
                  value={formData.crop}
                  onValueChange={(value) => {
                    // Update crop and reset dependent variety in one state update
                    setFormData((prev) => ({
                      ...prev,
                      crop: value,
                      variety: "",
                    }));
                  }}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select crop" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(crops).map((crop) => (
                      <SelectItem key={crop} value={crop}>
                        {crop}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Variety</Label>
                <Select
                  value={formData.variety}
                  onValueChange={(value) =>
                    handleSelectChange("variety", value)
                  }
                  disabled={!formData.crop}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select variety" />
                  </SelectTrigger>
                  <SelectContent>
                    {crops[formData.crop]?.map((v) => (
                      <SelectItem key={v} value={v}>
                        {v}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Grade + Price */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <div className="space-y-2">
                <Label>Grade</Label>
                <Select
                  value={formData.grade}
                  onValueChange={(value) =>
                    handleSelectChange("grade", value)
                  }
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select grade" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5].map((g) => (
                      <SelectItem key={g} value={String(g)}>
                        {g}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Price (₹ per unit)</Label>
                <Input
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleChange}
                  min="0"
                  required
                />
              </div>
            </div>

            {/* Quantities */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <div className="space-y-2">
                <Label>Total Quantity</Label>
                <Input
                  name="total_quantity"
                  type="number"
                  value={formData.total_quantity}
                  onChange={handleChange}
                  min="0"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Available Quantity</Label>
                <Input
                  name="available_quantity"
                  type="number"
                  value={formData.available_quantity}
                  onChange={handleChange}
                  min="0"
                  required
                />
              </div>
            </div>

            {/* Location + Date */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <div className="space-y-2">
                <Label>Location</Label>
                <Input
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="e.g. Pune, Maharashtra"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Harvest Date</Label>
                <Input
                  name="harvest_date"
                  type="date"
                  value={formData.harvest_date}
                  onChange={handleChange}
                  max={new Date().toISOString().split("T")[0]}
                />
              </div>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 text-white text-sm font-medium"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Adding Listing...
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
  );
}