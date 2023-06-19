import EntryCard from "@/components/EntryCard";
import NewEntryCard from "@/components/NewEntryCard";
import Question from "@/components/Question";
import { analyze } from "@/utils/ai";
import { getUserByClerkId } from "@/utils/auth";
import { prisma } from "@/utils/db";
import Link from "next/link";

const getEntries = async () => {
  const user = await getUserByClerkId();

  const entries = await prisma.journalEntry.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  // await analyze(
  //   `Today was a great day. I find a new coffee shop and I'm meeting someone special tomorrow :)`
  // );

  return entries;
};

const JournalPage = async () => {
  const entries = await getEntries();
  return (
    <div className="px-6 py-8 bg-zinc-100/50 h-full">
      <div className="text-4xl mb-12">Journals</div>

      <div className="my-8">
        <Question />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <NewEntryCard />
        {entries.map((entry) => (
          <div key={entry.id}>
            <Link href={`/journal/${entry.id}`}>
              <EntryCard key={entry.id} entry={entry} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JournalPage;
