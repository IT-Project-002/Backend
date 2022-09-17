"""empty message

Revision ID: 619b77af2f19
Revises: 
Create Date: 2022-09-18 23:34:28.310014

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = '619b77af2f19'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('username', sa.String(length=200), nullable=False),
    sa.Column('email', sa.String(length=100), nullable=False),
    sa.Column('password', sa.String(length=200), nullable=False),
    sa.Column('join_time', sa.DateTime(), nullable=True),
    sa.Column('bio', sa.String(length=200), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('username')
    )
    op.drop_table('products')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('products',
    sa.Column('id', sa.INTEGER(), autoincrement=True, nullable=False),
    sa.Column('username', sa.VARCHAR(length=200), autoincrement=False, nullable=False),
    sa.Column('name', sa.VARCHAR(length=200), autoincrement=False, nullable=False),
    sa.Column('price', sa.NUMERIC(), autoincrement=False, nullable=False),
    sa.Column('tags', postgresql.ARRAY(sa.VARCHAR(length=200)), autoincrement=False, nullable=False),
    sa.Column('images', postgresql.ARRAY(sa.VARCHAR(length=200)), autoincrement=False, nullable=False),
    sa.Column('add_time', postgresql.TIMESTAMP(), autoincrement=False, nullable=True),
    sa.PrimaryKeyConstraint('id', name='products_pkey')
    )
    op.drop_table('users')
    # ### end Alembic commands ###
