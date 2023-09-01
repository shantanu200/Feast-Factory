import { useState, useEffect } from "react";
import {
  Avatar,
  Box,
  Stack,
  TextField,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Typography,
  Chip,
} from "@mui/material";
import { getData, getHData, postData, postDataV2 } from "../../server";
import { Send } from "@mui/icons-material";

interface CommentUser {
  _id: string;
  userName: string;
}

interface PropsCommentForm {
  paddingHorizontal: number;
  isReply: boolean;
  commentID: string;
}

export const CommentForm: React.FC<PropsCommentForm> = ({
  paddingHorizontal,
  isReply,
  commentID,
}) => {
  const _id = location.pathname.split("/")[2];
  const [logUser, setLogUser] = useState<CommentUser>({
    userName: "",
    _id: "",
  });

  const [comment, setComment] = useState<string>("");

  useEffect(() => {
    async function fetchUser() {
      const { error, data } = await getHData(`/user/token`);

      if (error) {
        console.error(data);
      } else {
        setLogUser(data?.data);
      }
    }
    fetchUser();
  }, []);

  const handleSend = async () => {
    if (!comment) {
      alert("Please add comment");
      return;
    }

    try {
      const { error, data } = await postDataV2(
        isReply ? `/recipe/reply/${_id}` : `/recipe/comment/${_id}`,
        isReply
          ? {
              commentID,
              author: logUser._id,
              comment,
            }
          : {
              author: logUser._id,
              comment,
            }
      );

      if (error) {
        console.error(data);
      } else {
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Box display={"flex"} alignItems={"center"} py={2} px={paddingHorizontal}>
      <Avatar sx={{ mr: 2 }}>{logUser?.userName[0]?.toUpperCase()}</Avatar>
      <OutlinedInput
        placeholder="Enter your comment"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setComment(e.target.value)
        }
        endAdornment={
          <InputAdornment position="end">
            <IconButton onClick={handleSend}>
              <Send />
            </IconButton>
          </InputAdornment>
        }
        fullWidth
      />
    </Box>
  );
};

interface IReply {
  _id: string;
  author: {
    userName: string;
    _id: string;
  };
  comment: string;
  timeStamp: string;
}

interface Comment {
  _id: string;
  author: {
    userName: string;
    _id: string;
  };
  comment: string;
  replies: IReply[];
  timeStamp: string;
}

export const CommentView: React.FC = () => {
  const _id = location.pathname.split("/")[2];
  const [count, setCount] = useState<number>(3);

  const [comments, setComments] = useState<Comment[]>([]);
  const [isReply, setIsReply] = useState<string>("");
  const [isReplyCalled, setIsReplyCalled] = useState<string>("");

  useEffect(() => {
    async function fetchComments() {
      const { error, data } = await getData(
        `/recipe/comment/${_id}/?count=${count}`
      );

      if (error) {
        console.error(data);
      } else {
        setComments(data?.data);
      }
    }
    fetchComments();
  }, [_id, count]);

  const repliesView = (data: IReply[]) => {
    return (
      <Box px={8}>
        {data.map((reply, id) => {
          return (
            <Box key={id} display={"flex"} gap={2} my={2}>
              <Avatar>{reply?.author?.userName[0].toUpperCase()}</Avatar>
              <Box>
                <Typography variant={"caption"}>
                  @{reply.author.userName}
                </Typography>
                <Typography>{reply.comment}</Typography>
              </Box>
            </Box>
          );
        })}
      </Box>
    );
  };

  return (
    <Stack>
      {comments.map((val, idx) => {
        return (
          <>
            <Box
              key={idx}
              display={"flex"}
              alignItems={"center"}
              gap={4}
              columnGap={2}
              py={2}
            >
              <Avatar>{val?.author?.userName[0]?.toUpperCase()}</Avatar>
              <Box>
                <Typography variant={"caption"} component={"a"}>
                  @{val.author?.userName}
                </Typography>
                <Typography>{val?.comment}</Typography>

                {val.replies.length > 0 && (
                  <Chip
                    onClick={() => {
                      setIsReply(val._id);
                      setIsReplyCalled(val._id);
                    }}
                    sx={{
                      mr: 2,
                    }}
                    label={`${val.replies.length} replies`}
                  />
                )}
                <Typography
                  variant={"button"}
                  color={"primary"}
                  onClick={() => {
                    setIsReply(val._id);
                    setIsReplyCalled(val._id);
                  }}
                >
                  Reply
                </Typography>
              </Box>
            </Box>
            {isReply === val._id && repliesView(val.replies)}
            {isReplyCalled === val._id && (
              <CommentForm
                paddingHorizontal={8}
                isReply={true}
                commentID={val._id}
              />
            )}
          </>
        );
      })}
      <Box display={"flex"} justifyContent={"flex-end"}>
        <Typography variant={"button"} onClick={() => setCount(count + 10)}>
          View comments
        </Typography>
      </Box>
    </Stack>
  );
};
