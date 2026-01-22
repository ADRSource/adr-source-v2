'use client';

import AutoScroll from 'embla-carousel-auto-scroll';
import useEmblaCarousel from 'embla-carousel-react';
import { MemberCardItem } from '~/components/member-card-item';

interface Member {
  id: string;
  name: string;
  url: string;
  headshot: string;
  role: string;
}

export function TeamCarousel({ members }: { members: Member[] }) {
  const [emblaRef] = useEmblaCarousel({ loop: true, align: 'start', dragFree: true }, [
    AutoScroll({
      playOnInit: true,
      stopOnMouseEnter: true,
      stopOnInteraction: false,
      startDelay: 1000,
      speed: 1.618,
    }),
  ]);

  return (
    <div className="relative flex justify-center">
      <div className="overflow-x-hidden py-2" ref={emblaRef}>
        <div className="grid w-full auto-cols-[304px] grid-flow-col">
          {members.map((member) => (
            <div key={member.id} className="min-w-0 pl-2">
              <MemberCardItem name={member.name} url={member.url} headshot={member.headshot} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
