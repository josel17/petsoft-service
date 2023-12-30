import z from 'zod';

 
const schemaValidLogin = z
  .object({
    username: z.string(),
    password: z.string(),
  })
  .partial();

function valid(parameters)
{
    return schemaValidLogin.safeParse(parameters);
}

export {valid};