// import {
//   createParamDecorator,
//   ExecutionContext,
//   UnauthorizedException,
// } from '@nestjs/common';

// export const CookieGetter = createParamDecorator(
//   async (data: string, context: ExecutionContext): Promise<string> => {
//     const request = context.switchToHttp().getRequest();

//     const refreshToken = request.cookie[data];
//     if (!refreshToken) {
//       throw new UnauthorizedException('Token is not found');
//     }
//     return refreshToken;
//   },
// );

import {
  ExecutionContext,
  UnauthorizedException,
  createParamDecorator,
} from '@nestjs/common';

export const CookieGetter = createParamDecorator(
  async (data: string, context: ExecutionContext): Promise<string> => {
    const request = context.switchToHttp().getRequest();
    const refreshToken = request.cookies[data];

    if (!refreshToken) {
      throw new UnauthorizedException('Token not found');
    }
    return refreshToken;
  },
);
