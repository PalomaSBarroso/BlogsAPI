module.exports = (sequelize, DataTypes) => {
    const PostCategory = sequelize.define('PostCategory',
    {
      postId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        field: 'post_id'
      },
  
      categoryId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        field: 'category_id'
      },
    }, {
      timestamps: false,
      underscored: true, 
      tableName: 'posts_categories'
    });
  
    PostCategory.associate = ({ BlogPost, Category }) => {
      BlogPost.belongsToMany(Category, {
        as: 'categories',
        through: PostCategory,
        foreignKey: 'postId',
        otherKey: 'categoryId',
      });
  
      Category.belongsToMany(BlogPost, {
        as: 'posts',
        through: PostCategory,
        foreignKey: 'categoryId',
        otherKey: 'postId',
      });
    };
  
    return PostCategory;
  };