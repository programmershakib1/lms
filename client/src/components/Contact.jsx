import toast from "react-hot-toast";
import { motion } from "framer-motion";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useForm } from "react-hook-form";

const Contact = () => {
  const { animationValue } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    const { name, phone, email, question } = data;

    const date = new Date();

    const questionInfo = {
      name,
      phone,
      email,
      question,
      date,
    };

    if (!user) return;

    axiosSecure.post("/question", questionInfo).then((res) => {
      reset();
      if (res.data.insertedId) {
        toast.success("Question submit successful");
      }
    });
  };

  return (
    <div className="mx-5 md:mx-0 mt-20">
      <motion.div {...animationValue} className="text-center">
        <h2 className="text-2xl font-black text-center font-row">
          Are you having any problems?
        </h2>
        <p className="font-semibold text-p">
          Send us your question and we will try to answer you quickly.
        </p>
      </motion.div>
      <motion.form
        onSubmit={handleSubmit(onSubmit)}
        {...animationValue}
        className="flex flex-col gap-2"
      >
        <div className="w-full flex flex-col">
          <label>
            <span className="font-semibold">Name</span>
          </label>
          <input
            type="text"
            placeholder="Name"
            className="border border-black dark:bg-c dark:border-c mt-2 p-3 rounded-full"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>
        <div className="flex flex-col md:flex-row justify-between gap-2 md:gap-5">
          <div className="w-full flex flex-col">
            <label>
              <span className="font-semibold">Phone</span>
            </label>
            <input
              name="phone"
              type="number"
              placeholder="Phone"
              className="border border-black dark:bg-c dark:border-c mt-2 p-3 rounded-full"
              {...register("phone", { required: "Phone is required" })}
            />
            {errors.phone && (
              <p className="text-red-500">{errors.phone.message}</p>
            )}
          </div>
          <div className="w-full flex flex-col">
            <label>
              <span className="font-semibold">Email</span>
            </label>
            <input
              name="email"
              type="email"
              placeholder="Email"
              className="border border-black dark:bg-c dark:border-c mt-2 p-3 rounded-full"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>
        </div>
        <div className="flex flex-col">
          <label>
            <span className="font-semibold">Question</span>
          </label>
          <textarea
            name="question"
            type="text"
            placeholder="Question"
            className="border border-black dark:bg-c dark:border-c h-48 mt-2 p-3 rounded-md"
            {...register("question", { required: "Question is required" })}
          ></textarea>
          {errors.question && (
            <p className="text-red-500">{errors.question.message}</p>
          )}
        </div>
        <button className="w-36 bg-black text-white dark:bg-c dark:border-c py-2.5 px-6 rounded-sm font-bold mt-3 font-row">
          SUBMIT
        </button>
      </motion.form>
    </div>
  );
};

export default Contact;
