"use client";

import * as Avatar from "@radix-ui/react-avatar";

import styles from "@/styles/images.module.css";

type AvatarProps = {
  url: string;
  fallbackUrl: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
};

export default function AvatarComponent({
  url,
  fallbackUrl,
  alt,
  className,
  width = 100,
  height = 100,
}: AvatarProps) {
  return (
    <Avatar.Root
      className={(styles.AvatarRoot, className)}
      style={{ width: width, height: height }}
    >
      <Avatar.Image className={styles.AvatarImage} src={url} alt={alt} />
      <Avatar.Fallback className={styles.AvatarFallback} delayMs={600}>
        <Avatar.Image
          className={styles.AvatarImage}
          src={fallbackUrl}
          alt={alt}
        />
      </Avatar.Fallback>
    </Avatar.Root>
  );
}
