import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AuthLayout } from './auth-layout';
import IlustracaoLogin from '@/assets/images/ilustracaoLogin.svg';
import Button from '../button';
import Input from '../input';
import { LoginSchema } from '@/lib/schemas';

interface LoginFormProps {
  onSubmit: (data: { email: string; password: string }) => void;
}

export function LoginForm({ onSubmit }: LoginFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(LoginSchema),
    mode: 'onChange',
  });

  return (
    <AuthLayout
      illustration={IlustracaoLogin}
      illustrationAlt="Ilustração Login"
      illustrationWidth={333.25}
      illustrationHeight={267}
      title="Login"
    >
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Email"
          type="email"
          id="login-email"
          autoComplete="email"
          placeholder="Digite seu email"
          error={errors.email?.message}
          {...register('email')}
        />
        <Input
          label="Senha"
          type="password"
          id="login-password"
          autoComplete="current-password"
          placeholder="Digite sua senha"
          error={errors.password?.message}
          {...register('password')}
        />
        <div className="text-left mb-2">
          <Button
            variant="link"
            label="Esqueci a senha!"
            aria-label="Recuperar senha esquecida"
          />
        </div>
        <Button
          label="Acessar"
          type="submit"
          centered
          aria-label="Fazer login na conta"
          disabled={!isValid}
        />
      </form>
    </AuthLayout>
  );
}
