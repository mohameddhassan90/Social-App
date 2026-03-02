import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  useDraggable,
} from "@heroui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import { PropagateLoader } from "react-spinners";

export default function DeleteModal({ post }) {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const targetRef = React.useRef(null);
  const { moveProps } = useDraggable({ targetRef, isDisabled: !isOpen });
  const query = useQueryClient();

  const { data, isPending, mutate } = useMutation({
    mutationFn: deletePost,
    onSuccess: (data) => {
      toast.success(data?.data?.message);
      query.invalidateQueries({ queryKey: ["feed"] });
      query.invalidateQueries({ queryKey: ["community"] });
      query.invalidateQueries({ queryKey: [`userPosts`] });
      query.invalidateQueries({ queryKey: [`notifictions`] });
      query.invalidateQueries({ queryKey: ["comment", post?._id] });
      query.invalidateQueries({ queryKey: ["singlepost", post?._id] });
      query.invalidateQueries({ queryKey: ["suggested"] });
      query.invalidateQueries({ queryKey: ["countNotifictions"] });

      onClose();
    },
  });

  function deletePost() {
    return axios.delete(
      `https://route-posts.routemisr.com/posts/${post?._id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(`token`)}`,
        },
      },
    );
  }

  function handleDelete() {
    mutate();
  }

  return (
    <>
      <button
        onClick={onOpen}
        className="cursor-pointer flex w-full items-center gap-2 px-3 py-2 text-left text-sm font-semibold text-rose-600 hover:bg-rose-50"
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
          className="lucide lucide-trash2 lucide-trash-2"
          aria-hidden="true"
        >
          <path d="M10 11v6" />
          <path d="M14 11v6" />
          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
          <path d="M3 6h18" />
          <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
        </svg>
        Delete post
      </button>
      <Modal ref={targetRef} isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader
                {...moveProps}
                className="text-red-500 text-center font-bold flex flex-col gap-1"
              >
                Delete Post
              </ModalHeader>
              {isPending ? (
                <PropagateLoader className="h-15 flex justify-center items-center"></PropagateLoader>
              ) : (
                <ModalBody>
                  <p className="text-center">
                    Are You Sure ?... <br /> You Want To Delete This Post ?...
                  </p>
                </ModalBody>
              )}
              <ModalFooter className="mx-auto">
                <Button color="danger" onPress={onClose}>
                  Cancel
                </Button>
                <Button onClick={handleDelete} color="primary">
                  Confirm
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
