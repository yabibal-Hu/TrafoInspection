import { useTranslation } from "react-i18next";

export default function Footer() {
   const { t } = useTranslation();
  return (
    <div className="bg-[#1F2937] text-gray-200 py-1 text-center font-mono absolute bottom-0 w-full ">{t("footer.by")}</div>
  );
}
