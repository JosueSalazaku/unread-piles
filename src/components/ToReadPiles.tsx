import { useCustomSession } from "./SessionProvider";
import FadeLoader from "react-spinners/FadeLoader";
import Image from "next/image";
import Link from "next/link";
import { useFetchGoogleBooksById } from "@/app/util/hooks/useFetchGoogleBooksById";
import { useFetchUserBooks } from "@/app/util/hooks/useFetchUserBooks";

export default function ToReadPiles() {
  const session = useCustomSession();
  const userId = session.data?.user?.id;

    const { data: userBooks, error: userBooksError, isLoading: isUserBooksLoading } = useFetchUserBooks(userId ?? "");
  
    // Filter userBooks by status "Currently Reading"
    const bookIds = userBooks?.filter((userBook) => userBook.status === "To read").map((userBook) => userBook.bookId) ?? [];
    const validBookIds = bookIds.filter((id): id is string => id !== undefined);
  
    const { data: googleBooks, error: googleBooksError, isLoading: isGoogleBooksLoading } = useFetchGoogleBooksById(validBookIds);

    if (!userId) {
      return <div>You are not logged in. Please sign in to view your information.</div>;
    }
  
    if (userBooksError) {
      return <div>{userBooksError.message}</div>;
    }
  
    if (isUserBooksLoading || isGoogleBooksLoading) {
      return (
        <div className="flex h-screen w-screen items-center justify-center">
          <FadeLoader color="#912b12" />
        </div>
      );
    }
  
    if (googleBooksError) {
      return <div>{googleBooksError.message}</div>;
    }

    return (
      <div className="flex flex-col items-center">
        <div className="flex flex-col items-center">
          <h1 className="py-4 text-center">Currently Reading</h1>
          {googleBooks && googleBooks.length > 0 ? (
            <ul className="flex flex-row justify-center gap-5">
              {googleBooks.map((book) => (
                <li key={book.id}>
                  <Link href={`/books/${book.id}`}>
                    <Image
                      src={book.volumeInfo?.imageLinks?.thumbnail ?? "/default-image.jpg"}
                      alt={book.volumeInfo?.title ?? ""}
                      width={190}
                      height={40}
                      className="w-24 h-36"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div>No books yet</div>
          )}
        </div>
      </div>
    );
}
