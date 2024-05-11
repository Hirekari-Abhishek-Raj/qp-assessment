export const successResponse = (req:any, res:any, results?:any, code = 200) => {
    res.status(code).send({
      code,
      newToken: req.user?.newToken,
      results,
      success: true,
    });
  };
  
export const errorResponse = (
req:any,
res:any,
errorMessage:unknown = 'Something went wrong',
code = 500,
error = {},
) =>
res.status(code).json({
    code,
    errorMessage,
    error,
    data: null,
    success: false,
});