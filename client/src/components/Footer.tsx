import { useTranslation } from "react-i18next";

export default function Footer() {
   const { t } = useTranslation();
  return (
    <div className="bg-[#1F2937] text-gray-200 py-1 text-center text-xs font-mono fixed bottom-0 max-w-[1380px] w-full">{t("footer.by")}</div>
  );
}
