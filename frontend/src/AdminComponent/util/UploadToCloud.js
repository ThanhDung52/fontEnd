// const upload_preset = "ttd-food"
// const cloud_name = "dnmtvgvjy"
// const api_url = "https://api.cloudinary.com/v1_1/demo/image/upload"


// export const uploadImageToCloudinary = async(file)=>{
//     const data = new FormData();
//     data.append("file",file);
//     data.append("upload_preset",upload_preset);
//     data.append("cloud_name", cloud_name);

//     const res= await fetch(api_url,{
//         method:"post",
//         body:data
//     })

//     const fileData = await res.json();
//     return fileData.url
// }


const upload_preset = "ttd-food";
const cloud_name = "dnmtvgvjy";
const api_url = `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`;

export const uploadImageToCloudinary = async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", upload_preset);

    // Nếu bạn cần cung cấp thêm thông tin, hãy thêm các trường khác tại đây
    // data.append("cloud_name", cloud_name); // Không cần dòng này vì tên cloud được chỉ định trong URL

    const res = await fetch(api_url, {
        method: "POST",
        body: data
    });

    if (!res.ok) {
        const errorData = await res.json();
        console.error("Error uploading image:", errorData);
        // throw new Error("Image upload failed");
    }

    const fileData = await res.json();
    return fileData.url;
};
