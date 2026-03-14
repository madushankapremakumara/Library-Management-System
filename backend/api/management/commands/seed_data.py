from django.core.management.base import BaseCommand
from api.models import Book, User, Author, Category

class Command(BaseCommand):
    help = 'Seeds the database with initial data'

    def handle(self, *args, **kwargs):
        # 1. Create Users
        if not User.objects.filter(username='librarian').exists():
            User.objects.create_user(
                username='librarian', 
                password='password123', 
                email='admin@library.com', 
                role='librarian', 
                name='Librarian Admin'
            )
            self.stdout.write(self.style.SUCCESS('Created librarian user'))
        
        if not User.objects.filter(username='member').exists():
            User.objects.create_user(
                username='member', 
                password='password123', 
                email='member@library.com', 
                role='member', 
                name='John Member'
            )
            self.stdout.write(self.style.SUCCESS('Created member user'))

        # 2. Create Category
        category, _ = Category.objects.get_or_create(
            name="Fiction", 
            description="General Fiction books"
        )

        # 3. Create Authors and Books
        books_data = [
            { "title": "The Great Gatsby", "author": "F. Scott Fitzgerald", "description": "A story of the mysteriously wealthy Jay Gatsby and his love for the beautiful Daisy Buchanan.", "isbn": "9780743273565" },
            { "title": "To Kill a Mockingbird", "author": "Harper Lee", "description": "The unforgettable novel of a childhood in a sleepy Southern town and the crisis of conscience that rocked it.", "isbn": "9780061120084" },
            { "title": "1984", "author": "George Orwell", "description": "A dystopian social science fiction novel and cautionary tale about the dangers of totalitarianism.", "isbn": "9780451524935" },
            { "title": "Pride and Prejudice", "author": "Jane Austen", "description": "A romantic novel of manners following the character development of Elizabeth Bennet.", "isbn": "9780141439518" },
        ]

        for data in books_data:
            author_name = data.pop('author')
            if not Book.objects.filter(isbn=data['isbn']).exists():
                # Create Author
                author, _ = Author.objects.get_or_create(name=author_name)
                # Create Book
                book = Book.objects.create(**data, category=category)
                book.authors.add(author)
                self.stdout.write(self.style.SUCCESS(f'Created book: {data["title"]}'))
