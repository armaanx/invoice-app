import { useAppSelector } from "@/hooks/reduxHooks";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const InvoicePage = () => {
  const navigate = useNavigate();
  const pdfBlob = useAppSelector((state) => state.pdf.pdf);

  useEffect(() => {
    if (!pdfBlob) {
      navigate("/add-products");
      return;
    }

    const pdfUrl = URL.createObjectURL(pdfBlob);

    return () => {
      URL.revokeObjectURL(pdfUrl);
    };
  }, [pdfBlob, navigate]);

  if (!pdfBlob) return null;

  return (
    <div className="min-h-screen bg-zinc-900 flex flex-col items-center justify-start pt-32 pb-12 px-6">
      <div className="w-full max-w-7xl mx-auto">
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-white text-4xl font-bold">Invoice</h1>
        </div>
        <iframe
          src={URL.createObjectURL(pdfBlob)}
          className="w-full h-[800px] border border-zinc-700 rounded-lg"
          title="Invoice PDF"
        />
      </div>
    </div>
  );
};

export default InvoicePage;
