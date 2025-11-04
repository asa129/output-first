import { RecordButton } from "@/components/recordButton";
import { TextareaWithText } from "@/components/ui/textareaWithText";

export default async function page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  return (
    <div>
      {/* <Header /> */}
      <TextareaWithText />
      <p>タイトル:{params.title}</p>
      <p>URL:{params.url}</p>
      <RecordButton />
    </div>
  );
}
