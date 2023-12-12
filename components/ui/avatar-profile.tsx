import * as Avatar from "@radix-ui/react-avatar";
import styles from "@/styles/avatarProfile.module.css";

export default function AvatarProfile({ path }: { path: string }) {
  return (
    <Avatar.Root className={styles.AvatarRoot}>
      <Avatar.Image
        src={path}
        alt="Image du profil"
        className={styles.AvatarImage}
      />
      <Avatar.Fallback className={styles.AvatarFallback}>
        <Avatar.Image
          src="/default_profile.png"
          alt="Image de profil par défaut"
          className={styles.AvatarImage}
        />
      </Avatar.Fallback>
    </Avatar.Root>
  );
}
