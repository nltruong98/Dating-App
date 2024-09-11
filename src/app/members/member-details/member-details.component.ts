import { Component, inject, OnInit } from '@angular/core';
import { MembersService } from '../../_service/members.service';
import { ActivatedRoute } from '@angular/router';
import { Member } from '../../_models/Member';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { GalleryItem, GalleryModule, ImageItem } from 'ng-gallery';

@Component({
  selector: 'app-member-details',
  standalone: true,
  imports: [TabsModule, GalleryModule],
  templateUrl: './member-details.component.html',
  styleUrl: './member-details.component.css',
})
export class MemberDetailsComponent implements OnInit {
  private memberService = inject(MembersService);
  private route = inject(ActivatedRoute);
  member?: Member;
  images: GalleryItem[] = [];

  ngOnInit(): void {
    this.loadMember();
  }

  loadMember() {
    const userName = this.route.snapshot.paramMap.get('userName');
    if (!userName) return;
    this.memberService.getMember(userName).subscribe({
      next: (member) => {
        this.member = member;
        member.photos?.map((photo) => {
          this.images.push(new ImageItem({ src: photo.url, thumb: photo.url }));
        });
      },
    });
  }
}
