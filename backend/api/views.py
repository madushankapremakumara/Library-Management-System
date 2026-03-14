from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import User, Book, BorrowRecord, Author, Category
from .serializers import UserSerializer, BookSerializer, BorrowRecordSerializer, AuthorSerializer, CategorySerializer

class AuthorViewSet(viewsets.ModelViewSet):
    queryset = Author.objects.all()
    serializer_class = AuthorSerializer
    permission_classes = [permissions.AllowAny]

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [permissions.AllowAny]

class BookViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    permission_classes = [permissions.AllowAny]

    @action(detail=True, methods=['post'])
    def borrow(self, request, pk=None):
        book = self.get_object()
        if book.available_copies <= 0:
            return Response({'error': 'No copies available'}, status=status.HTTP_400_BAD_REQUEST)
        
        user = User.objects.first() # Placeholder for current user auth
        record = BorrowRecord.objects.create(user=user, book=book)
        
        book.available_copies -= 1
        book.save()
        
        return Response(BorrowRecordSerializer(record).data)

    @action(detail=True, methods=['post'])
    def return_book(self, request, pk=None):
        book = self.get_object()
        if book.available_copies >= book.total_copies:
            return Response({'error': 'All copies are already returned'}, status=status.HTTP_400_BAD_REQUEST)
        
        from django.utils import timezone
        record = BorrowRecord.objects.filter(book=book, status='active').first()
        if record:
            record.status = 'returned'
            record.return_date = timezone.now()
            record.save()
            
        book.available_copies += 1
        book.save()
        
        return Response({'status': 'Book copy returned successfully'})

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]

    @action(detail=False, methods=['post'])
    def register(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        email = request.data.get('email')
        name = request.data.get('name', '')
        role = request.data.get('role', 'member')
        birth_date = request.data.get('birth_date')
        gender = request.data.get('gender')
        
        if User.objects.filter(username=username).exists():
            return Response({'error': 'User already exists'}, status=status.HTTP_400_BAD_REQUEST)
            
        # Members are auto-approved, librarians need approval
        is_approved = (role == 'member')
        
        user = User.objects.create_user(
            username=username, 
            password=password, 
            email=email, 
            role=role, 
            name=name,
            birth_date=birth_date,
            gender=gender,
            is_approved=is_approved
        )
        return Response(UserSerializer(user).data, status=status.HTTP_201_CREATED)

    @action(detail=False, methods=['get'])
    def pending_librarians(self, request):
        pending = User.objects.filter(role='librarian', is_approved=False)
        return Response(UserSerializer(pending, many=True).data)

    @action(detail=True, methods=['post'])
    def approve(self, request, pk=None):
        user = self.get_object()
        user.is_approved = True
        user.save()
        return Response({'status': f'User {user.username} approved'})
