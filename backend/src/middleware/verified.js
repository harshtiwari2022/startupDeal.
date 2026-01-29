export const verifiedOnly = (req, res, next) => {
  if (!req.user || !req.user.isVerified) {
    return res
      .status(403)
      .json({ message: "Account verification required" });
  }
  next();
};
