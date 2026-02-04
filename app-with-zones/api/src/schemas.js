const { z } = require('zod');

// Schema de Login
const LoginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email é obrigatório')
    .email('Email inválido'),
  password: z
    .string()
    .min(1, 'Senha é obrigatória')
    .min(6, 'Senha deve ter no mínimo 6 caracteres'),
});

// Schema de Registro
const RegisterSchema = z
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

// Schema de Transação (Débito/Crédito)
const TransactionSchema = z.object({
  amount: z
    .string()
    .min(1, 'Valor é obrigatório')
    .pipe(z.coerce.number().positive('Valor deve ser maior que 0')),
  type: z.enum(['Credit', 'Debit'], {
    errorMap: () => ({ message: 'Tipo de transação inválido' }),
  }),
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

// Schema de Transferência
const TransferSchema = z.object({
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
    .pipe(z.coerce.number().positive('Valor deve ser maior que 0')),
  description: z
    .string()
    .optional(),
});

// Schema de Usuário (para respostas da API)
const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  balance: z.number().optional(),
});

module.exports = {
  LoginSchema,
  RegisterSchema,
  TransactionSchema,
  TransferSchema,
  UserSchema,
};
