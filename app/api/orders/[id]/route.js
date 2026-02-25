import dbConnect from "@/lib/dbConfig";
import order_model from "@/models/order_model";
export async function GET(req,{ params }) {
    const { id } = await params;
    if (!Types.ObjectId.isValid(id)) {
        return Response.json({success:false,message: "Not Found"}, { status: 400 });
    }
    try {
        await dbConnect()
        const plainData = await order_model.find({
          farmer_id : id
        }).populate('listings_id')
        // const data = plainData.map(order => JSON.parse(JSON.stringify(order)));
        // console.log(data)
        return Response.json({success:true,message:"Success",data:plainData},{status:200})
    } catch (error) {
        console.log("Something went wrong",error)
        return Response.json({success:false,message:"Internal Server Error",data:null},{status:500})

    }
}
export async function DELETE(req, { params }) {
  const { id } = await params;

  if (!Types.ObjectId.isValid(id)) {
    return Response.json({ success: false, message: "Invalid ID" }, { status: 400 });
  }

  try {
    await dbConnect();
    const result = await order_model.deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      return Response.json({ success: false, message: "Not Found" }, { status: 404 });
    }

    return Response.json({ success: true, message: "Deleted Successfully" }, { status: 200 });
  } catch (error) {
    console.log("Something went wrong", error);
    return Response.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}