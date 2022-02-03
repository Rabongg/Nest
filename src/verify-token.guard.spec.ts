import { AuthGuard } from './verify-token.guard';
import { createMock } from '@golevelup/ts-jest';
import { ExecutionContext, UnauthorizedException } from '@nestjs/common';

describe('AuthGuard', () => {
  let authGuard: AuthGuard;

  beforeEach(() => {
    authGuard = new AuthGuard();
  });

  it('should be defined', () => {
    expect(authGuard).toBeDefined();
  });

  describe('canAactivate', () => {
    it('should have a fully mocked Execution Context', () => {
      const mockContext = createMock<ExecutionContext>();
      expect(mockContext.switchToHttp()).toBeDefined();
      expect(mockContext.switchToHttp().getRequest()).toBeDefined();
    });

    it('should return true', () => {
      const mockContext = createMock<ExecutionContext>();
      mockContext.switchToHttp().getRequest.mockReturnValue({
        session: {
          user_id: 1,
        },
      });
      const result = authGuard.canActivate(mockContext);
      expect(result).toBe(true);
    });

    it('should throw error when session is not exist', () => {
      try {
        const mockContext = createMock<ExecutionContext>();
        mockContext.switchToHttp().getRequest.mockReturnValue({});
        authGuard.canActivate(mockContext);
      } catch (err) {
        expect(err).toBeInstanceOf(UnauthorizedException);
        expect(err.message).toBe('로그인을 해야 합니다.');
      }
    });
  });
});
