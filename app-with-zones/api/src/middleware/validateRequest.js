/**
 * Middleware para validação de requisições usando Zod
 * Valida o req.body contra um schema Zod e retorna erros padronizados
 * 
 * @param {ZodSchema} schema - Schema Zod para validar o corpo da requisição
 * @returns {function} Middleware Express
 */
const validateRequest = (schema) => {
  return (req, res, next) => {
    try {
      const result = schema.safeParse(req.body);

      if (!result.success) {
        return res.status(400).json({
          success: false,
          message: 'Validação falhou',
          errors: result.error.flatten().fieldErrors,
        });
      }

      // Dados validados são passados para o próximo middleware/controller
      req.validated = result.data;
      next();
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Erro ao validar requisição',
        error: error.message,
      });
    }
  };
};

module.exports = validateRequest;
