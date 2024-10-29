import { Component, computed, inject, input } from '@angular/core';
import { Member } from '../../_models/member';
import { RouterLink } from '@angular/router';
import { LikeService } from '../../_service/like.service';
import { PresenceService } from '../../_service/presence.service';

@Component({
  selector: 'app-member-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './member-card.component.html',
  styleUrl: './member-card.component.css',
})
export class MemberCardComponent {
  private likeService = inject(LikeService);
  private presenceServie = inject(PresenceService);
  member = input.required<Member>();
  hasLiked = computed(() =>
    this.likeService.likeIds().includes(this.member().id)
  );
  isOnline = computed(() =>
    this.presenceServie.onlineUsers().includes(this.member().userName)
  );

  toggleLike() {
    this.likeService.toggleId(this.member().id).subscribe({
      next: () => {
        if (this.hasLiked()) {
          this.likeService.likeIds.update((ids) =>
            ids.filter((id) => id !== this.member().id)
          );
        } else {
          this.likeService.likeIds.update((ids) => [...ids, this.member().id]);
        }
      },
    });
  }
}
