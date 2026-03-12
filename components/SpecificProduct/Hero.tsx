import Image from "next/image";

export default function Hero({ url, alt }: { url: string; alt: string }) {
  return (
    <div className="relative w-full h-[40vh] bg-slate-900">
      <Image src={url} alt={alt} fill className="object-cover opacity-50" />
      <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent" />
    </div>
  );
}
