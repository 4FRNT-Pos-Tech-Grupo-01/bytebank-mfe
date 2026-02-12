import { z } from 'zod';

// Schema de Login
export const LoginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email é obrigatório')
    .email('Email inválido'),
  password: z
    .string()
    .min(1, 'Senha é obrigatória')
    .min(6, 'Senha deve ter no mínimo 6 caracteres'),
});

export type LoginInput = z.infer<typeof LoginSchema>;

// Schema de Registro
export const RegisterSchema = z
  .object({
    name: z
      .string()
      .min(1, 'Nome é obrigatório')
      .min(3, 'Nome deve ter no mínimo 3 caracteres'),
    email: z
      .string()
      .min(1, 'Email é obrigatório')
      .email('Email inválido'),
    password: z
      .string()
      .min(1, 'Senha é obrigatória')
      .min(6, 'Senha deve ter no mínimo 6 caracteres'),
    confirmPassword: z
      .string()
      .min(1, 'Confirmação de senha é obrigatória'),
    agreedToTerms: z
      .boolean()
      .refine((val) => val === true, {
        message: 'Você deve aceitar os termos e condições',
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não correspondem',
    path: ['confirmPassword'],
  });

export type RegisterInput = z.infer<typeof RegisterSchema>;

// Schema de Transação (Débito/Crédito)
export const TransactionSchema = z.object({
  amount: z
    .string()
    .min(1, 'Valor é obrigatório')
    .transform((val) => parseFloat(val))
    .refine((val) => !isNaN(val), 'Valor deve ser um número válido')
    .refine((val) => val > 0, 'Valor deve ser maior que 0'),
  type: z.enum(['Credit', 'Debit'], { message: 'Tipo de transação inválido' }),
  date: z
    .string()
    .min(1, 'Data é obrigatória')
    .refine(
      (date) => !isNaN(Date.parse(date)),
      'Data inválida'
    ),
  description: z
    .string()
    .optional(),
});

export type TransactionInput = z.infer<typeof TransactionSchema>;

// Schema de Transferência
export const TransferSchema = z.object({
  recipientName: z
    .string()
    .min(1, 'Nome do destinatário é obrigatório')
    .min(3, 'Nome deve ter no mínimo 3 caracteres'),
  recipientEmail: z
    .string()
    .min(1, 'Email do destinatário é obrigatório')
    .email('Email inválido'),
  amount: z
    .string()
    .min(1, 'Valor é obrigatório')
    .transform((val) => parseFloat(val))
    .refine((val) => !isNaN(val), 'Valor deve ser um número válido')
    .refine((val) => val > 0, 'Valor deve ser maior que 0'),
  description: z
    .string()
    .optional(),
});

export type TransferInput = z.infer<typeof TransferSchema>;

// Schema de Usuário (para respostas da API)
export const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  balance: z.number().optional(),
});

export type User = z.infer<typeof UserSchema>;
