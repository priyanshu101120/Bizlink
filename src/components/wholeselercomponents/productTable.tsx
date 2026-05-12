import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PackageOpen, Pencil, Trash2 } from "lucide-react";
import { Product } from "@/hooks/useWholesaler";

type Props = {
  products: Product[];
  handleEditProduct: (product: Product) => void;
  handleDelete: (id: string) => void;
};

const productTable = ({ products, handleEditProduct, handleDelete }: Props) => {
  return (
    <div>
      {products.length === 0 ? (
        <div className="bg-white border border-dashed border-[#006989]/40 rounded-2xl flex flex-col items-center justify-center p-12 shadow-sm text-center">
          <div className="bg-slate-100 p-4 rounded-full mb-4">
            <PackageOpen className="w-12 h-12 text-slate-400 opacity-50" />
          </div>
          <p className="text-lg md:text-xl font-medium text-slate-500">
            No products in your inventory.
          </p>
          <p className="text-sm text-slate-400 mt-1">
            Start by adding your first product.
          </p>
        </div>
      ) : (
        <div className="bg-white border border-[#006989] rounded-2xl overflow-hidden shadow-sm">
          <Table>
            <TableHeader className="bg-slate-50">
              <TableRow>
                <TableHead className="font-bold  py-4">PRODUCT NAME</TableHead>
                <TableHead className="font-bold  py-4">STOCK LEVEL</TableHead>
                <TableHead className="font-bold  py-4">PRICE (₹)</TableHead>
                <TableHead className="text-center font-bold  py-4">
                  ACTIONS
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow
                  key={product.id}
                  className="hover:bg-slate-50/80 transition-colors"
                >
                  <TableCell className="font-semibold text-gray-900">
                    {product.name}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium text-gray-700">
                        {product.quantity}
                      </span>
                      {product.quantity === 0 ? (
                        <Badge
                          variant="destructive"
                          className="text-[10px] uppercase font-bold px-2 py-0.5"
                        >
                          Out of Stock
                        </Badge>
                      ) : product.quantity <= 10 ? (
                        <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100 text-[10px] uppercase font-bold px-2 py-0.5">
                          Low Stock
                        </Badge>
                      ) : (
                        <Badge className="bg-green-100 text-green-700 hover:bg-green-100 text-[10px] uppercase font-bold px-2 py-0.5">
                          In Stock
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="font-bold text-[#006989]">
                    <div className="flex flex-col">
                      <span className="font-bold text-[#006989] text-base">
                        ₹
                        {product.price.toLocaleString("en-IN", {
                          minimumFractionDigits: 2,
                        })}
                      </span>
                      <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">
                        per item
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditProduct(product)}
                        className="h-8 border-[#006989]/20 text-[#006989] hover:bg-[#006989] hover:text-white transition-all gap-1.5"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                        Edit
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 border-red-500/20 text-red-500 hover:bg-red-200 hover:text-red-600 transition-all gap-1.5"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            Delete
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Are you absolutely sure?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will
                              permanently delete the product{" "}
                              <span className="font-bold">{product.name}</span>{" "}
                              from your inventory.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                            className="bg-red-500 text-white hover:bg-red-600 focus:ring-red-500"
                              onClick={() => handleDelete(product.id)}
                            >
                              Continue
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default productTable;
