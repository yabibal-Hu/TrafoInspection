import { useTranslation } from "react-i18next";

export default function Footer() {
   const { t } = useTranslation();
  return (
    <div className="bg-[#1F2937] text-gray-400 py-1 text-center font-mono sticky bottom-0 w-full ">{t("footer.by")}</div>
  );
}
