import { EditorContainer } from "@/components/EditorContainer";
import { RendererContainer } from "@/components/RendererContainer";
import { QDeltaProvider } from "@/context-providers/QDelta";
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  PreviewData,
} from "next";
import { ParsedUrlQuery } from "querystring";
import type { Delta } from "quill";
import { useState } from "react";

export default function Home({ title }: HomeProps) {
  const [deltaDocument, setDeltaDocument] = useState<Delta | null>(null);

  return (
    <div>
      <h1>{`${title}`}</h1>
      <QDeltaProvider delta={deltaDocument} setDelta={setDeltaDocument}>
        <EditorContainer />
        <RendererContainer />
      </QDeltaProvider>
    </div>
  );
}

type HomeProps = {
  title: string;
};
export const getServerSideProps: GetServerSideProps = async (
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>,
) => {
  const title = "Server-Side rendered";

  return {
    props: {
      title,
    },
  };
};
