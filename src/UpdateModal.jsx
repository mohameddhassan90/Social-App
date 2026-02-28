import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Checkbox,
  Input,
  Link,
  LinkIcon,
} from "@heroui/react";
import { useContext, useRef, useState } from "react";
import { authContext } from "./Context/AuthContext";
import { Icons, toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Loading from "./Loading";

export const MailIcon = (props) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 24 24"
      width="1em"
      {...props}
    >
      <path
        d="M17 3.5H7C4 3.5 2 5 2 8.5V15.5C2 19 4 20.5 7 20.5H17C20 20.5 22 19 22 15.5V8.5C22 5 20 3.5 17 3.5ZM17.47 9.59L14.34 12.09C13.68 12.62 12.84 12.88 12 12.88C11.16 12.88 10.31 12.62 9.66 12.09L6.53 9.59C6.21 9.33 6.16 8.85 6.41 8.53C6.67 8.21 7.14 8.15 7.46 8.41L10.59 10.91C11.35 11.52 12.64 11.52 13.4 10.91L16.53 8.41C16.85 8.15 17.33 8.2 17.58 8.53C17.84 8.85 17.79 9.33 17.47 9.59Z"
        fill="currentColor"
      />
    </svg>
  );
};

export const LockIcon = (props) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 24 24"
      width="1em"
      {...props}
    >
      <path
        d="M12.0011 17.3498C12.9013 17.3498 13.6311 16.6201 13.6311 15.7198C13.6311 14.8196 12.9013 14.0898 12.0011 14.0898C11.1009 14.0898 10.3711 14.8196 10.3711 15.7198C10.3711 16.6201 11.1009 17.3498 12.0011 17.3498Z"
        fill="currentColor"
      />
      <path
        d="M18.28 9.53V8.28C18.28 5.58 17.63 2 12 2C6.37 2 5.72 5.58 5.72 8.28V9.53C2.92 9.88 2 11.3 2 14.79V16.65C2 20.75 3.25 22 7.35 22H16.65C20.75 22 22 20.75 22 16.65V14.79C22 11.3 21.08 9.88 18.28 9.53ZM12 18.74C10.33 18.74 8.98 17.38 8.98 15.72C8.98 14.05 10.34 12.7 12 12.7C13.66 12.7 15.02 14.06 15.02 15.72C15.02 17.39 13.67 18.74 12 18.74ZM7.35 9.44C7.27 9.44 7.2 9.44 7.12 9.44V8.28C7.12 5.35 7.95 3.4 12 3.4C16.05 3.4 16.88 5.35 16.88 8.28V9.45C16.8 9.45 16.73 9.45 16.65 9.45H7.35V9.44Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default function UpdateModal({ postId, post, setOpen }) {
  const query = useQueryClient();
  const { userData } = useContext(authContext);
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  const contentInput = useRef(null);
  const imageInput = useRef(null);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const { data, mutate, isPending } = useMutation({
    mutationFn: updatePost,
    onSuccess: (data) => {
      toast.success(data?.data?.message);
      query.invalidateQueries({ queryKey: ["feed"] });
        query.invalidateQueries({ queryKey: ["community"] });
        query.invalidateQueries({ queryKey: [`userPosts`] });
        query.invalidateQueries({ queryKey: [`notifictions`] });
        query.invalidateQueries({ queryKey: ["comment", postId] });
        query.invalidateQueries({ queryKey: ["singlepost", postId] });
        query.invalidateQueries({ queryKey: ["suggested"] });
        query.invalidateQueries({ queryKey: ["countNotifictions"] });
      onClose();
      setOpen(false);
    },
  });

  function updatePost(newObj) {
    return axios.put(
      `https://route-posts.routemisr.com/posts/${postId}`,
      newObj,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(`token`)}`,
        },
      },
    );
  }

  function handleImg(e) {
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);
    setImage(url);
    setImagePreview(url);
  }

  function handleSubmit() {
    const formData = new FormData();
    if (contentInput.current.value)
      formData.append(`body`, contentInput.current.value);
    if (imageInput.current.files[0])
      formData.append(`image`, imageInput.current.files[0]);
    mutate(formData);
  }

  return (
    <>
      <button
        onClick={onOpen}
        className="cursor-pointer flex w-full items-center gap-2 px-3 py-2 text-left text-sm font-semibold text-slate-700 hover:bg-slate-50"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={15}
          height={15}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-pencil"
          aria-hidden="true"
        >
          <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
          <path d="m15 5 4 4" />
        </svg>
        Edit post
      </button>
      <Modal isOpen={isOpen} placement="top-center" onOpenChange={onOpenChange}>
        <ModalContent className="max-h-120">
          <>
            <ModalHeader className="text-center text-amber-500 font-bold flex flex-col gap-1">
              Update Post
            </ModalHeader>
            {isPending ? (
              <Loading></Loading>
            ) : (
              <ModalBody>
                <textarea
                  defaultValue={post?.body}
                  rows={2}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-[17px] leading-relaxed text-slate-800 outline-none transition focus:border-[#1877f2] focus:bg-white  "
                  spellCheck="false"
                  placeholder={`What's on your mind, ${userData?.name}?`}
                  type="text"
                  ref={contentInput}
                />
                <label className="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={18}
                    height={18}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-image text-emerald-600"
                    aria-hidden="true"
                  >
                    <rect width={18} height={18} x={3} y={3} rx={2} ry={2} />
                    <circle cx={9} cy={9} r={2} />
                    <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                  </svg>
                  <span className="hidden sm:inline">Photo/video</span>
                  <input
                    ref={imageInput}
                    onChange={handleImg}
                    className="hidden"
                    type="file"
                  />
                </label>

                {(imagePreview || post?.image) && (
                  <img
                    src={imagePreview ? imagePreview : post?.image}
                    alt=""
                    className="w-full h-40 object-cover rounded my-2"
                  />
                )}
              </ModalBody>
            )}
            <ModalFooter>
              <Button color="danger" variant="flat" onPress={onClose}>
                Close
              </Button>
              <Button
                onClick={() => {
                  handleSubmit();
                }}
                color="primary"
              >
                Confirm
              </Button>
            </ModalFooter>
          </>
        </ModalContent>
      </Modal>
    </>
  );
}
