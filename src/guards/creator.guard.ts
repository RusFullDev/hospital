import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class CreatorGuards implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();

    const adminHeader = req.headers.authorization;
    if (!adminHeader) {
      throw new UnauthorizedException({
        message: "Supper Admin roy'xatdan o'tmagan",
      });
    }
    const bearer = adminHeader.split(' ')[0];
    const token = adminHeader.split(' ')[1];
    if (bearer !== 'Bearer' || !token) {
      throw new UnauthorizedException({
        message: "Supper Admin roy'xatdan o'tmagan(token xato)",
      });
    }
    let admin: any;
    try {
      admin = this.jwtService.verify(token);
      if (!(admin.is_active && admin.is_creator)) {
        throw new UnauthorizedException({
          message: 'Supper Admin account is not active',
        });
      }
    } catch (error) {
      throw new UnauthorizedException({
        message: "SupperAdmin roy'xatdan o'tmagan(token berilmagan)",
      });
    }
    req.admin = admin;

    return true;
  }
}
