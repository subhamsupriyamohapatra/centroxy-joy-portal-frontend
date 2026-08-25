import Image from "next/image";

export function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary via-primary to-primary/80 flex items-center justify-center">
        <Image
          src="/centroxy/image/site-logo-black.svg"
          alt="Centroxy"
          width={20}
          height={20}
          className="brightness-0 invert"
          quality={100}
        />
      </div>
      <div>
        <h3 className="font-bold text-dark dark:text-white text-sm">Centroxy</h3>
        <p className="text-xs text-gray-500 dark:text-gray-400">Joy Portal</p>
      </div>
    </div>
  );
}
