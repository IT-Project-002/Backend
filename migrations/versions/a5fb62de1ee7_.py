"""empty message

Revision ID: a5fb62de1ee7
Revises: 8b3426b32a13
Create Date: 2022-09-29 22:35:42.781905

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'a5fb62de1ee7'
down_revision = '8b3426b32a13'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('users', 'hide_email',
               existing_type=sa.BOOLEAN(),
               nullable=False)
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('users', 'hide_email',
               existing_type=sa.BOOLEAN(),
               nullable=True)
    # ### end Alembic commands ###
