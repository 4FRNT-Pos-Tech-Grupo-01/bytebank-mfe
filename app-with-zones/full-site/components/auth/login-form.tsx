'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AuthLayout } from './auth-layout';
import IlustracaoLogin from '@/assets/images/ilustracaoLogin.svg';
import Button from '../button';
import Input from '../input';
import { login } from '@/app/api/auth';
import { setIsAuthModalOpen } from '@/features/modal/modalSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store';
import { setIsLoggedIn } from '@/features/auth/authSlice';
import { useRouter } from 'next/navigation';
import { setUserAuthenticated } from '@/features/user/userSlice';
import { LoginSchema } from '@/lib/schemas';
import { toast } from 'react-toastify';

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(LoginSchema),
    mode: 'onChange',
  });

  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  async function onSubmit(data: { email: string; password: string }) {
    try {
      const response = await login(data);

      if (response.result.token) {
        dispatch(setIsAuthModalOpen(false));
        dispatch(setIsLoggedIn(true));
        dispatch(setUserAuthenticated(data.email));

        router.push('/dashboard');
      }
    } catch (err: unknown) {
      toast.error('Email ou senha inválidos');
      console.log('Email ou senha inválidos', err);
    }
  }

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
          centered
          aria-label="Fazer login na conta"
          type="submit"
          disabled={!isValid}
        />
      </form>
    </AuthLayout>
  );
}
