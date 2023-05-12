import dbConnect from "../../../db/connect";
import Product from "../../../db/models/Product";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  if (request.method === "GET") {
    const product = await Product.findById(id).populate("reviews");

    if (!product) {
      return response.status(404).json({ status: "Not Found" });
    }

    response.status(200).json(product);
    return;
  }

  if (request.method === "PUT") {
    const product = await Product.findByIdAndUpdate(id, { $set: request.body });

    if (!product) {
      response.status(404).json({ status: "Not Found" });
      return;
    }

    response.status(200).json({ status: "Product successfully updated." });
    return;
  }

  if (request.method === "DELETE") {
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      response.status(404).json({ status: "Not Found" });
      return;
    }

    response.status(200).json({ status: "Product successfully deleted." });
    return;
  }
}
