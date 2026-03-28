"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Modal from "@/components/ui/Modal";
import { Slider } from "@/components/ui/slider"
import { MoonLoader } from "react-spinners"
import { toast } from "sonner"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Wheat, MapPin, Clock, Gavel, IndianRupee, PackageCheck, Search, Filter, Sprout, Star, Banknote } from "lucide-react";
import { cache, useEffect, useState } from "react";
import crops from "@/public/crops.json";
import Cookies from "js-cookie";
export default function Listings() {
  const [isPopup, setIsPopup] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isPlacingBid, setIsPlacingBid] = useState(false)
  const [placingBidId, setPlacingBidId] = useState(null)
  const [listings, setListings] = useState([])
  const [lisObj, setlisObj] = useState({})
  const [bidPrice, setBidPrice] = useState(0)
  const [quantity, setQuantity] = useState(0)
  const [finalPrice, setFinalPrice] = useState(0)
  const [filteredGrade, setFilteredGrade] = useState([1])
  const [filterLocation, setFilterLocation] = useState("")
  const [filterCrop, setFilterCrop] = useState("")
  const [filterVariety, setFilterVariety] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [isFarmer, setIsFarmer] = useState(false)
  const [mounted, setMounted] = useState(false)
  const url = process.env.NEXT_PUBLIC_BASE_URL;

  async function handleApplyFilter() {
    try {
      setIsLoading(true)
      const params = new URLSearchParams();

      if (filterCrop) params.append("crop", filterCrop);
      if (filterVariety) params.append("variety", filterVariety);
      if (filterLocation) params.append("location", filterLocation);
      if (searchQuery) params.append("search", searchQuery);

      params.append("grade_min", filteredGrade[0]);
      params.append("grade_max", 5);

      const res = await fetch(`${url}/api/listings?${params.toString()}`)
      if (!res.ok) throw new Error("Failed to fetch listings")
      const data = await res.json()
      setListings(data.data || [])
    } catch (err) {
      console.error(err);
      toast.error("Failed to load filtered listings")
    } finally {
      setIsLoading(false)
    }
  }
  function handleClearAll() {
  setFilterLocation("");
  setFilterCrop("");
  setFilterVariety("");
  setFilteredGrade([1]);
  setSearchQuery("");
  getData();
}
  const formatter = new Intl.NumberFormat("en-IN", {
    style: "decimal",
    maximumFractionDigits: 2,
  });
  function handlePopup(id) {
    setIsPopup(true)
    const temp = listings.find(lis => lis._id == id)
    if (!temp) return;
    setBidPrice(temp.price)
    setQuantity(temp.available_quantity)
    setlisObj(temp)
  }
  async function handlePlaceBit(id, title, variety, price, far_id) {
    try {
      if (isPlacingBid) return;
      setIsPlacingBid(true)
      setPlacingBidId(id)

      const response = await fetch(`${url}/api/bids`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          farmer_id: far_id,
          listings_id: id,
          total: Number(finalPrice),
          quantity: Number(quantity),
          title: title,
          variety: variety,
          bid_price: Number(bidPrice)
        })
      })

      const data = await response.json()
      if (!response.ok) {
        throw new Error(data?.message || "Failed to place bid")
      }

      toast.success("Success", {
        description: "Bid placed succesfully",
      })
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error!", {
        description: error?.message || "Something went wrong",
      })
    } finally {
      setIsPlacingBid(false)
      setPlacingBidId(null)
    }
  }
  useEffect(() => {
    setFinalPrice(quantity * bidPrice)
  }, [quantity, bidPrice])
  async function getData() {
    try {
      setIsLoading(true)
      const response = await fetch(`${url}/api/listings`)
      if (!response.ok) {
        const data = await response.json().catch(() => null)
        throw new Error(data?.message || `HTTP ${response.status}`)
      }

      const data = await response.json()
      setListings(data.data || [])
    } catch (error) {
      console.error("Fetch error:", error);
      toast.error("Failed to load listings")
    } finally {
      setIsLoading(false)
    }
  }
  useEffect(() => {
    const role = Cookies.get("role");
    if(role === "farmer"){
      setIsFarmer(true)
      
    }
    else{
      setIsFarmer(false)
    }
    getData()
  }, [])
  return (
    <>
      <div className="bg-gradient-to-br from-green-50 via-white to-green-50/50 dark:from-green-950/20 dark:via-black dark:to-green-950/10 min-h-screen flex flex-col lg:flex-row w-full gap-2 p-3 items-start">
        {/* Popup Modal */}
        {isPopup && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-2">
            <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border border-green-200 dark:border-green-800/30 flex flex-col justify-center rounded-2xl w-full sm:w-3/4 lg:w-1/2 shadow-lg p-6 relative">
              <button
                onClick={() => setIsPopup(false)}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 cursor-pointer"
              >
                ✕
              </button>
              <div className="flex w-full justify-between">
                <div>
                  <h2 className="text-lg sm:text-xl font-semibold mb-3">{lisObj?.title || " "}</h2></div>
                <div className="w-fit px-2 gap-1  py-1 bg-green-100 dark:bg-green-900/30 font-semibold font-mono text-xs text-green-700 dark:text-green-400 h-5 flex mx-5  rounded-lg  justify-center items-center border border-green-200 dark:border-green-800/30">
                  <Gavel size={15} className="text-green-600 dark:text-green-400" />
                  <p>{lisObj.total_bids}</p>
                  <p>bids</p>
                </div>
              </div>
              <p className="text-gray-600 mb-4">{lisObj?.location || " "}</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full sm:w-3/4">
                <div className="flex items-center gap-1 text-sm font-medium text-gray-500">
                  <Wheat size={15} />
                  <p>{lisObj.crop}</p>
                </div>
                <div className="flex items-center gap-1 text-sm font-medium text-gray-500">
                  <PackageCheck size={15} />
                  <p>{lisObj.available_quantity} Q</p>
                </div>
                <div className="flex items-center gap-1 text-sm font-medium text-gray-500">
                  <IndianRupee size={15} />
                  <p>{lisObj.price}/Q</p>
                </div>
                <div className="flex items-center gap-1 text-sm font-medium text-gray-500">
                  <Sprout size={15} />
                  <p>{lisObj.variety}</p>
                </div>
                <div className="flex items-center gap-1 text-sm font-medium text-gray-500">
                  <Clock size={15} />
                  <p>{new Date(lisObj.harvest_date).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}</p>
                </div>
                <div className="flex items-center gap-1 text-sm font-medium text-gray-500">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={13}
                      className={i < lisObj.grade ? "" : "hidden"}
                      color={i < lisObj.grade ? "gold" : "#d1d5db"}
                      fill={i < lisObj.grade ? "gold" : "none"}
                    />
                  ))}
                </div>
              </div>

              <div className={`flex flex-col sm:flex-row items-center justify-between w-full mt-10 gap-4 ${isFarmer? "hidden" : ""}`}>
                <div className="w-full sm:w-1/3 flex sm:flex-col gap-3 ">
                  <div className="flex items-center justify-between gap-1 w-full sm:w-full">
                    <div><p>Quant.:</p></div>
                    <Input type="number" className="w-1/2" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                  </div>
                  <div className="flex items-center justify-between gap-1 w-full sm:w-full">
                    <div><p>Price :</p></div>
                    <Input type="number" className="w-1/2" value={bidPrice} onChange={(e) => setBidPrice(e.target.value)} />
                  </div>
                </div>
                <div className="flex items-center gap-1 text-sm font-medium text-green-700 dark:text-green-400">
                  <Banknote size={20} className="text-green-600 dark:text-green-400" />
                  <p>₹ {formatter.format(finalPrice)}</p>
                </div>
                <div className="flex flex-row md:flex-col gap-4 justify-center items-center">
                  <Button
                    className="cursor-pointer bg-green-600 hover:bg-green-700 text-white dark:bg-green-700 dark:hover:bg-green-600"
                    disabled={isPlacingBid && placingBidId === lisObj._id}
                    onClick={() => handlePlaceBit(lisObj._id, lisObj.title, lisObj.variety, lisObj.price, lisObj.farmer_id)}
                  >
                    {isPlacingBid && placingBidId === lisObj._id ? "Placing..." : "Place Bid"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Filters Sidebar */}
<div className={`h-fit w-full lg:w-1/4 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-green-200 dark:border-green-800/30 rounded-lg flex flex-col items-center shadow-md p-2`}>
  
  <div className="mt-4 h-10 font-semibold gap-1.5 flex flex-row items-center text-green-800 dark:text-green-400">
    <Filter size={22} className="text-green-600 dark:text-green-400" />
    Filters
  </div>

  <div className="w-full flex flex-col h-full gap-4 p-3">

    {/* Location INPUT */}
    <div className="w-full flex flex-col gap-2">
      <div>Location</div>
      <Input
        placeholder="e.g. Pune"
        value={filterLocation}
        onChange={(e) => setFilterLocation(e.target.value)}
      />
    </div>

    {/* Crop */}
    <div className="w-full flex flex-col gap-2">
      <div>Crop</div>
      <Select
        value={filterCrop}
        onValueChange={(value) => {
          setFilterCrop(value);
          setFilterVariety(""); // reset variety
        }}
      >
        <SelectTrigger className="w-full">
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

    {/* Variety (dependent) */}
    <div className="w-full flex flex-col gap-2">
      <div>Variety</div>
      <Select
        value={filterVariety}
        onValueChange={(value) => setFilterVariety(value)}
        disabled={!filterCrop}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select variety" />
        </SelectTrigger>
        <SelectContent>
          {crops[filterCrop]?.map((v) => (
            <SelectItem key={v} value={v}>
              {v}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>

    {/* Grade */}
    <div className="w-full flex flex-col gap-2">
      <div>Minimum Grade</div>

      <div className="flex flex-row gap-3 items-center">
        <Slider
          value={filteredGrade}
          onValueChange={setFilteredGrade}
          min={1}
          max={5}
          step={1}
        />
        <div className="flex items-center gap-1 text-gray-500 font-semibold">
          <div>{filteredGrade[0]}</div>
          <Star fill="gold" color="gold" size={15} />
        </div>
      </div>

      <div className="flex justify-between mt-5">
        <button
          className="text-green-600 hover:text-green-700"
          onClick={handleClearAll}
        >
          Clear all
        </button>

        <Button
          onClick={handleApplyFilter}
          className="bg-green-600 hover:bg-green-700 text-white"
        >
          Apply
        </Button>
      </div>
    </div>
  </div>
</div>

        {/* Listings Section */}
        <div className={`flex flex-col h-fit w-full  items-center p-5`}>
          {/* Search Box */}
          <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-green-200 dark:border-green-800/30 w-full sm:w-3/4 lg:w-1/2 h-10 mb-10 flex justify-center items-center gap-2 p-2 rounded-md shadow-md">
            <Input onChange={(e) => setSearchQuery(e.target.value)} className="flex-1 focus-visible:outline-none border-none focus-visible:border-none " placeholder="Search..." />
            <button className="cursor-pointer" onClick={handleApplyFilter} ><Search className="text-green-600 dark:text-green-400" /></button>
          </div>

          <div className="flex flex-col w-full h-full gap-5 p-3">
            {isLoading ? (
              <div className="flex justify-center items-center h-40">
                <MoonLoader color="black" size={30} />
              </div>
            ) : listings?.length === 0 ? (
              <div className="text-gray-600 flex justify-center items-center w-full">No Listings found</div>
            ) : (
              listings?.map((lis) => (
                <button
                  key={lis._id}
                  onClick={() => handlePopup(lis._id)}
                  className="flex flex-col sm:flex-row shadow-md bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-green-200 dark:border-green-800/30 rounded-lg w-full h-auto sm:h-40 gap-3 p-2 hover:scale-[1.01] transition-transform cursor-pointer hover:shadow-lg"
                >
                  <div className="bg-green-50 dark:bg-green-900/20 rounded-lg text-green-600 dark:text-green-400 h-32 sm:h-full w-full sm:w-1/4 flex justify-center items-center border border-green-200 dark:border-green-800/30">
                    photo
                  </div>
                  <div className="bg-transparent w-full flex flex-col justify-evenly p-2 gap-1 items-start">
                    <div className="font-bold text-green-800 dark:text-green-400">{lis.title}</div>
                    <div className="flex text-sm text-gray-600 dark:text-gray-400 items-center gap-1">
                      <MapPin size={14} className="text-green-600 dark:text-green-400" />{lis.location}
                    </div>
                    <div className="flex flex-wrap sm:flex-nowrap w-full gap-5 sm:gap-10">
                      <div className="flex items-center gap-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                        <Wheat size={15} className="text-green-600 dark:text-green-400" /><p>{lis.crop}</p>
                      </div>
                      <div className="flex items-center gap-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                        <PackageCheck size={15} className="text-green-600 dark:text-green-400" /><p>{lis.available_quantity} Q</p>
                      </div>
                      <div className="flex items-center gap-1 text-sm font-medium text-green-800 dark:text-green-400">
                        <IndianRupee size={15} /><p>{lis.price}/Q</p>
                      </div>
                    </div>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}


