from rest_framework import serializers
from .models import User, Book, BorrowRecord, Author, Category

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'name', 'role', 'birth_date', 'gender', 'is_approved', 'date_joined']
        read_only_fields = ['is_approved', 'date_joined']

class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = '__all__'

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class BookSerializer(serializers.ModelSerializer):
    category_name = serializers.ReadOnlyField(source='category.name')
    author_list = AuthorSerializer(source='authors', many=True, read_only=True)
    
    class Meta:
        model = Book
        fields = [
            'id', 'isbn', 'title', 'category', 'category_name', 
            'authors', 'author_list', 'description', 
            'total_copies', 'available_copies', 'shelf_location', 
            'cover', 'available', 'borrowed'
        ]

class BorrowRecordSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    book = BookSerializer(read_only=True)
    
    class Meta:
        model = BorrowRecord
        fields = '__all__'
