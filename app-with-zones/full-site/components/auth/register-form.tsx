'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AuthLayout } from './auth-layout';
import IlustracaoCriacaoLogin from '@/assets/images/IlustraçãoCriacaoLogin.svg';
import Button from '../button';
import Input from '../input';
import { register as registerUser } from '@/app/api/register';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store';
import { setIsAuthModalOpen } from '@/features/modal/modalSlice';
import { RegisterSchema } from '@/lib/schemas';

interface RegisterFormProps {
  onSubmit?: (data: { name: string; email: string; password: string }) => void;
  formId?: string;
}

export function RegisterForm({ formId }: RegisterFormProps) {
  const uniqueId =
    formId || `register-form-${Math.random().toString(36).slice(2, 10)}`;

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm({
    resolver: zodResolver(RegisterSchema),
    mode: 'onChange',
  });

  const agreedToTerms = watch('agreedToTerms');
  const dispatch = useDispatch<AppDispatch>();

  async function onSubmit(data: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    agreedToTerms: boolean;
  }) {
    try {
      const response = await registerUser({
        username: data.name,
        email: data.email,
        password: data.password,
      });
      console.log('antes', response?.result?.id);
      if (response?.result?.id) {
        toast.success('Cadastro realizado com sucesso!');
        dispatch(setIsAuthModalOpen(false));
      }
    } catch (err: unknown) {
      toast.error('Erro ao realizar o registro do usuário');
      console.log('Register error', err);
    }
  }

  return (
    <AuthLayout
      illustration={IlustracaoCriacaoLogin}
      illustrationAlt="Ilustração Criação Login"
      illustrationWidth={354.96}
      illustrationHeight={261.6}
      title="Criar conta"
      subtitle="Preencha os campos abaixo para criar sua conta corrente!"
    >
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Nome completo"
          id={`${uniqueId}-name`}
          autoComplete="name"
          placeholder="Digite seu nome completo"
          error={errors.name?.message}
          {...register('name')}
        />
        <Input
          label="Email"
          id={`${uniqueId}-email`}
          type="email"
          autoComplete="email"
          placeholder="Digite seu email"
          error={errors.email?.message}
          {...register('email')}
        />
        <Input
          label="Senha"
          id={`${uniqueId}-password`}
          type="password"
          autoComplete="new-password"
          placeholder="Digite sua senha"
          error={errors.password?.message}
          {...register('password')}
        />
        <Input
          label="Confirmar Senha"
          id={`${uniqueId}-confirmPassword`}
          type="password"
          autoComplete="new-password"
          placeholder="Confirme sua senha"
          error={errors.confirmPassword?.message}
          {...register('confirmPassword')}
        />
        <div className="flex items-start gap-3 my-2">
          <input
            type="checkbox"
            id={`${uniqueId}-terms`}
            className="mt-1 w-4 h-4 accent-[var(--color-green)] border-[var(--color-green)] border-2 rounded focus:ring-green-500"
            aria-describedby={`${uniqueId}-terms-description`}
            {...register('agreedToTerms')}
          />
          <label
            htmlFor={`${uniqueId}-terms`}
            className="text-sm text-gray-600 leading-relaxed cursor-pointer"
            id={`${uniqueId}-terms-description`}
          >
            Li e estou ciente quanto às condições de tratamento dos meus dados
            conforme descrito na Política de Privacidade do banco.
          </label>
        </div>
        {errors.agreedToTerms && (
          <p className="text-red-500 text-sm">{errors.agreedToTerms.message}</p>
        )}
        <Button
          label="Criar conta"
          type="submit"
          disabled={!agreedToTerms || !isValid}
          centered
          aria-label={
            agreedToTerms
              ? 'Criar nova conta'
              : 'Aceite os termos para criar conta'
          }
        />
      </form>
    </AuthLayout>
  );
}
