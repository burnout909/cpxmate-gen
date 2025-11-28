'use client'
import { useTransition } from "react";
import Image from "next/image";
import LeftArrowIcon from "@/assets/icon/LeftArrowIcon.svg";
import Spinner from "./Spinner";
export default function SmallHeader({ title, onClick }: { title: string, onClick: () => void; }) {
    const [isPending, startTransition] = useTransition()
    function handleClick() {
        startTransition(() => {
            onClick()
        })
    }

    return (
        <div className="flex justify-between px-4 items-center pt-4">
            <div
                className="relative flex items-center justify-center w-[48px] h-[48px] cursor-pointer"
                onClick={handleClick}
            >
                <Image
                    src={LeftArrowIcon}
                    alt="뒤로가기"
                    width={22}
                    height={22}
                    className="w-[22px] h-[22px]"
                    priority
                />
                {isPending && (
                    <div className="absolute left-[40px] top-1/2 -translate-y-1/2 flex items-center justify-center">
                        <Spinner size={16} borderClassName="border-[#210535]" />
                    </div>
                )}
            </div>
            <div className="text-[18px] font-semibold text-[#210535]">
                {title}
            </div>
            <div className="w-[24px] h-[24px]" />
        </div>
    )
}
