# NOWP Group tərcümə sistemi (Claude versiyası)

## Deploy addımları (Vercel)

1. Bu qovluğu GitHub-da yeni bir repo-ya yükləyin (github.com > New repository > "uploading an existing file" linkindən sürüklə-burax edin, git əmrləri lazım deyil).
2. vercel.com saytına GitHub hesabınızla daxil olun.
3. "Add New Project" > repo-nuzu seçin > Import.
4. "Environment Variables" bölməsinə keçin, aşağıdakını əlavə edin:
   - Name: ANTHROPIC_API_KEY
   - Value: (console.anthropic.com-dan aldığınız açar)
5. Deploy düyməsinə basın.
6. Bir neçə dəqiqədən sonra sizə pulic bir link (məsələn: nowp-tercume.vercel.app) veriləcək — bunu istənilən adama göndərə bilərsiniz, giriş tələb olunmur.
