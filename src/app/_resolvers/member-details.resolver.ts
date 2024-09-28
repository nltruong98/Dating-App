import { ResolveFn } from '@angular/router';
import { Member } from '../_models/member';
import { inject } from '@angular/core';
import { MembersService } from '../_service/members.service';

export const memberDetailsResolver: ResolveFn<Member | null> = (
  route,
  state
) => {
  const memberService = inject(MembersService);

  const userName = route.paramMap.get('userName');

  if (!userName) {
    return null;
  }

  return memberService.getMember(userName);
};
