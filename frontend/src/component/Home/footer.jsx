import React from "react";

export const Footer =()=>{
    return(
        <footer class="bg-gray-800 text-white py-8">
        <div class="container mx-auto px-4">
            <div class="flex flex-col md:flex-row justify-between">
                <div class="mb-4 md:mb-0">
                    <h5 class="text-lg font-bold">Liên hệ</h5>
                    <p>Địa chỉ: 123 Đường ABC, Thành phố XYZ</p>
                    <p>Điện thoại: (123) 456-7890</p>
                    <p>Email: info@example.com</p>
                </div>
                <div class="mb-4 md:mb-0">
                    <h5 class="text-lg font-bold">Liên kết nhanh</h5>
                    <ul>
                        <li><a href="#" class="text-gray-400 hover:text-white">Trang chủ</a></li>
                        <li><a href="#" class="text-gray-400 hover:text-white">Giới thiệu</a></li>
                        <li><a href="#" class="text-gray-400 hover:text-white">Sản phẩm</a></li>
                        <li><a href="#" class="text-gray-400 hover:text-white">Liên hệ</a></li>
                    </ul>
                </div>
                <div>
                    <h5 class="text-lg font-bold">Mạng xã hội</h5>
                    <div class="flex space-x-4">
                        <a href="#" class="text-gray-400 hover:text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="w-6 h-6" viewBox="0 0 24 24"><path d="M12 0a12 12 0 00-12 12c0 5.25 3.42 9.69 8 11.26v-7.95H8v-3h2v-2.2c0-2.08 1.25-3.2 3.14-3.2.91 0 1.88.16 1.88.16v2.06h-1.06c-1.04 0-1.36.65-1.36 1.31V9h2.31l-.37 3h-1.94v7.95c4.58-1.57 8-6.01 8-11.26A12 12 0 0012 0z"/></svg>
                        </a>
                        <a href="#" class="text-gray-400 hover:text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="w-6 h-6" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.373 0 12c0 6.627 5.373 12 12 12 6.627 0 12-5.373 12-12C24 5.373 18.627 0 12 0zm4.285 17.047H15V12h1.285v-1.5H15V9.84c0-.773.221-1.305 1.116-1.305h1.169V7H16c-2.285 0-3.585 1.136-3.585 3.305v1.445H12v1.5h1.415v5.047z"/></svg>
                        </a>
                        <a href="#" class="text-gray-400 hover:text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="w-6 h-6" viewBox="0 0 24 24"><path d="M12 2.053c-5.1 0-9.25 4.048-9.25 9.25S6.9 20.553 12 20.553c5.1 0 9.25-4.048 9.25-9.25S17.1 2.053 12 2.053zm4.733 14.315c-.153.024-.296.045-.436.045-1.065 0-2.022-.48-2.629-1.226.016-.081.025-.164.025-.248v-2.353h2.505c.282 0 .49-.027.51-.031.079-.043.199-.184.199-.471v-.97c0-.303-.123-.438-.363-.438h-2.87c-.16 0-.289.135-.289.293v.929c0 .364-.285.635-.691.635h-1.057c-.05 0-.098-.003-.146-.008a4.955 4.955 0 01-.12-1.053c0-2.235 1.06-3.586 2.745-3.586h3.094c1.305 0 2.465.42 3.305 1.213.44.431.693.986.693 1.626 0 1.125-.69 1.94-1.956 2.022-1.553.086-2.953.244-3.376.332-.191.058-.385.079-.579.079zm-8.458-3.152c-.463 0-.841-.369-.841-.845 0-.469.378-.84.841-.84.465 0 .844.371.844.84 0 .476-.379.845-.844.845z"/></svg>
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <div class="bg-gray-700 text-center py-4">
            <p class="text-sm">© 2024 Công ty của tôi. Bảo lưu mọi quyền.</p>
        </div>
    </footer>
    )
}