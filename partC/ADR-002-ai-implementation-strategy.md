**Товч шийдвэр:** AI-ыг 3 түвшний хамтын ажиллагааны загвараар ашиглана:

- Түвшин 1 (60%) — AI-Driven: Boilerplate, тестийн skeleton, документац, жижиг refactor.
- Түвшин 2 (30%) — Hybrid: AI санал гаргана, хүн бизнес логик, security-ийг нарийвчлан шалгана.
- Түвшин 3 (10%) — Human Review: Аюулгүй байдал, гүйцэтгэл, production readiness баталгаажуулна.

**Яагаад энэ загвар?**
- Хурд: AI давтагдах ажлыг хурдан хийж, хүнийг чухал шийдвэрт төвлөрүүлэх боломж өгнө.
- Ялгаатай хариуцлага: Хүний шалгалтгүйгээр AI-гийн санал шууд production-руу орохгүй.
- Сургалт: Оюутан AI саналыг шүүн тунгааж сурах боломжтой.

**Практик мөрдөх зүйлс (хураангуй):**
- Тайлбар: AI-руу тодорхой, тохирсон prompt өгч ажиллуулна.
- Хяналт: Бүх SQL-г parameterized хийх; error message-нд stack trace дамжуулахгүй.
- Тест: AI-гийн үүсгэсэн код дээр edge-case тест бичнэ.

**Шалгах жагсаалт (богино):**
- Test coverage > 70%
- ESLint pass
- No raw SQL concatenation
- No stack traces in production responses

---

Энэхүү ADR нь бүрэн баримтлахад зориулагдсан нарийвчилсан зааврын товч хураангуй хувилбар юм.


**Prerequisite**: Developer must understand code, not blindly accept AI suggestions.

---

## References

- [GitHub Copilot Best Practices](https://github.com/features/copilot)
- [OWASP Secure Coding Practices](https://owasp.org/www-project-code-review-guide/)
- [Express.js Error Handling](https://expressjs.com/en/guide/error-handling.html)
- [Zod Validation Guide](https://zod.dev/)

---

**Approved By**: Student + AI Assistant  
**Date**: May 2026  
**Next Review**: After project completion (end of week 2)
