import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/hooks/useRetailer";
type Props = { products: Product[] };

export default function InventoryTable({ products }: Props) {
  return (
    <Card className="border border-[#006989] shadow-sm overflow-hidden">
      <Table>
        <TableHeader className="bg-slate-50">
          <TableRow>
            <TableHead>Product Name</TableHead>
            <TableHead>Wholesaler</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Price</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell className="font-medium">{product.name}</TableCell>
              <TableCell>{product.profile?.name}</TableCell>
              <TableCell>{product.quantity}</TableCell>
              <TableCell>₹{product.price.toLocaleString()}</TableCell>
              <TableCell className="text-right">
                {product.quantity === 0 ? (
                  <Badge variant="destructive">Out of Stock</Badge>
                ) : product.quantity <= 10 ? (
                  <Badge className="bg-yellow-500 hover:bg-yellow-600">Low Stock</Badge>
                ) : (
                  <Badge className="bg-green-600 hover:bg-green-700">In Stock</Badge>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}