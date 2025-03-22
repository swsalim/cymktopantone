import { DifficultyNavigation } from '@/components/pantone-game/difficulty-navigation';

export default function ChallengeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <DifficultyNavigation basePath="/pantone-match/challenge" />
      {children}
    </div>
  );
}
